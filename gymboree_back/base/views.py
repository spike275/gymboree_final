from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import CustomUser, Product, OrderItem, Orders,Review
from django.contrib.auth.models import User
from django.contrib.auth import logout, authenticate
from .Serializer import CustomUserSerializer, ProductSerializer, OrderItemSerializer, OrderSerializer,ReviewSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, generics

from rest_framework.pagination import PageNumberPagination


#### AUTHENTICATION VIEW ####

class LogoutAPIView(APIView):
    """
    API view to handle user logout.
    """
    def post(self, request):
        refresh_token = RefreshToken(request.data.get('refresh'))
        refresh_token.blacklist()
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class RefreshTokenView(generics.GenericAPIView):
    """
    API view to refresh authentication token.
    """
    serializer_class = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

#login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    API view to obtain JWT tokens with custom claims.
    """
    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['junk'] = "junk"
        # ...
        return token
    

# register
@api_view(['POST'])
def register(request):
    """
    API view to register a new user.
    """
    try:
        # Extract username and password from the request data
        tmp=request.data
        print('******************',tmp)
        username = request.data["username"]
        password = request.data["password"]
        address = request.data["address"]
        phone_number= request.data["phone_number"]
        email=request.data["email"]

        # Create a new user and save it to the database
        user = CustomUser.objects.create_user(username=username, password=password,address=address,phone_number=phone_number,email=email)

        # Get tokens for the new user
        serializer = MyTokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data

        # Return the tokens along with the user data
        serializer = CustomUserSerializer(user, many=False)
        response_data = {
            "tokens": tokens,
            "user": serializer.data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    except Exception as e:
        if "UNIQUE" in str(e):
            return Response("ERROR: UserName Exists", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("ERROR: " + str(e), status=status.HTTP_400_BAD_REQUEST)



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

####  PROFILE VIEW ####

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """
    API view to retrieve the authenticated user's profile.
    """
    user = request.user
    serilaizer = CustomUserSerializer(user, many=False)
    return Response(serilaizer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """
    API view to update the authenticated user's profile.
    """
    user = request.user
    serializer = CustomUserSerializer(
        instance=user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)

@api_view(['GET'])
def myProducts(req):
    """
    API view to retrieve a list of products.
    """
    if req.method == 'GET':
        all_products = Product.objects.all()
        if 'all' in req.query_params and req.query_params['all'] == 'true':
            serializer = ProductSerializer(all_products, many=True)
            return Response({'results': serializer.data})  # wrap the serialized data in a dictionary
        else:
            paginator = PageNumberPagination()
            paginator.page_size = 10  # set the number of items per page
            result_page = paginator.paginate_queryset(all_products, req)
            serializer = ProductSerializer(result_page, many=True)
            paginated_data = serializer.data
            return Response({
                'count': paginator.page.paginator.count,
                'next': paginator.get_next_link(),
                'previous': paginator.get_previous_link(),
                'results': paginated_data
            })  # wrap the paginated data in a dictionary with additional metadata

    if req.method == 'POST':
        Product.objects.create(
            name=req.data["name"], description=req.data["description"], price=req.data["price"])
        return Response("post...")
    
    if req.method == 'DELETE':
        Product.objects.delete(id=req.data["id"])
        return Response("delted")

@api_view(['GET'])
def getImages(request):
    """
    API view to retrieve product images.
    """
    paginator = PageNumberPagination()
    paginator.page_size = 5  # set the number of items per page

    images = Product.objects.all()
    result_page = paginator.paginate_queryset(images, request)
    
    res = []
    for img in result_page:
        res.append({
            "name": img.name,
            "description": img.description,
            "price": img.price,
            "image": str(img.image)
        })
    
    return paginator.get_paginated_response(res)

class APIViews(APIView):
    """
    API view to handle image upload and display.
    """
    parser_class = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        api_serializer = ProductSerializer(data=request.data)

        if api_serializer.is_valid():
            api_serializer.save()
            return Response(api_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', api_serializer.errors)
            return Response(api_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
            """
            API view to delete a product.
            """
            try:
                product = Product.objects.get(pk=pk)
            except Product.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

#### order view ####

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def order(req):
    """
    API view to place an order.
    """
    serializer = OrderSerializer(data={}, context={'user': req.user})
    if serializer.is_valid():
        serializer.save()
    else:
        print('**************ORDER*******************')
        print('error', serializer.errors)
        print('***************ORDER******************')

    order_id = Orders.objects.latest('id').id
    print(order_id)
# items
    for i in req.data:
        product = i['id']
        order = order_id
        name = i['name']
        qty = i['amount']
        price = i['price']
        image = i['image']
        item = {'product': product, 'order': order, 'name': name,
                'qty': qty, 'price': price, 'image': image}
        serializer = OrderItemSerializer(data=item)
        if serializer.is_valid():
            serializer.save()
        else:
            print('**************ORDER-ITEM*******************')
            print('error', serializer.errors)
            print('***************ORDER-ITEM******************')

    return HttpResponse(serializer.errors)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(req):
    """
    API view to retrieve orders of the authenticated user.
    """
    orders = Orders.objects.filter(user=req.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

#### REVIEW VIEW ####


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def get_all_reviews(req):
    """
    API view to retrieve all reviews.
    """
    serializer = ReviewSerializer(Review.objects.all(), many=True)
    return Response(serializer.data)

    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(req):
    """
    API view to create a review.
    """
    serializer = ReviewSerializer(data=req.data, context={"user":req.user})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print('**************review*******************')
        print('error', serializer.errors)
        print('***************review******************')
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


