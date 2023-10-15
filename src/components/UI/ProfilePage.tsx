
function ProfilePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        <div className="mt-4">
          <div className="mb-4">
            <label className="text-gray-600 font-medium">Full Name</label>
            <p className="text-gray-800">John Doe</p>
          </div>
          <div className="mb-4">
            <label className="text-gray-600 font-medium">Email</label>
            <p className="text-gray-800">johndoe@example.com</p>
          </div>
          <div className="mb-4">
            <label className="text-gray-600 font-medium">Bio</label>
            <p className="text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage