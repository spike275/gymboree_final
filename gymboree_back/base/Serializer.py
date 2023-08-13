from rest_framework import serializers
from .models import CustomUser, Product,OrderItem,Orders,Review

class ProductSerializer(serializers.ModelSerializer):
    """ 
    Serializer for Product model.
    """
    class Meta:
        model = Product
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    """
    Serializer for OrderItem model.
    """
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for Orders model.
    """
    orderItems = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Orders
        fields = '__all__'

    def create(self, validated_data):
        """
        Create an order for the authenticated user.
        """
        user = self.context['user']
        return Orders.objects.create(**validated_data, user=user)

    def get_orderItems(self, obj):
        """
        Get serialized order items for the order.
        """
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_user(self, obj):
        """
        Get the username of the user who made the order.
        """
        return obj.user.username


class CustomUserSerializer(serializers.ModelSerializer): 
    """
    Serializer for CustomUser model.
    """
    name = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    admin = serializers.SerializerMethodField(read_only=True)
    class Meta: 
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def get_name(self, object):
        """
        Get the name (first name or email) of the user.
        """
        name = object.first_name
        if name == '':
            name = object.email
        return name

    def get_id(self, object):
        """
        Get the ID of the user.
        """
        return object.id

    def get_admin(self, object):
        """
        Check if the user is an admin.
        """
        return object.is_staff

    def create(self, validated_data): 
        """
        Create a custom user.
        """
        user = self.context['user']
        return CustomUser.objects.create(**validated_data, user = user)


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for Review model.
    """
    class Meta:
        model = Review
        fields = '__all__'

    def create(self, validated_data):
        """
        Create a review for the authenticated user.
        """
        user = self.context['user']
        return Review.objects.create(**validated_data, user=user)

