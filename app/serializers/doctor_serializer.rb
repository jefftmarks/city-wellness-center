class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :bio, :certification, :image
end
