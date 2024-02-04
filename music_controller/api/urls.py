from django.urls import path
from .views import RoomView, CreateRoomView, GetRoomView, JoinRoomView, UserInRoomView, LeaveRoomView, GetAPIEndPointsView


app_name = 'api'

urlpatterns = [
    path('', RoomView.as_view(), name="RoomView"),
    path('endpoints', GetAPIEndPointsView.as_view(), name="GetAPIEndPoints"),
    path('create-room', CreateRoomView.as_view(), name="CreateRoomView"),
    path('get-room', GetRoomView.as_view(), name="GetRoom"),
    path('join-room', JoinRoomView.as_view(), name="JoinRoom"),
    path('user-in-room', UserInRoomView.as_view(), name="UserInRoom"),
    path('leave-room', LeaveRoomView.as_view(), name="LeaveRoom"),
]
