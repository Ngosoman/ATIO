import React from 'react';

const Settings = () => {
  // Mock admin profile data
  const adminProfile = {
    name: 'John Doe',
    email: 'john.doe@atio.com',
    role: 'Administrator',
    department: 'Knowledge Management',
    joinDate: 'January 2023',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Experienced administrator with a passion for knowledge organization and AI-driven solutions.',
    stats: {
      documentsManaged: 1247,
      usersSupported: 89,
      projectsCompleted: 23
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-8">
          <div className="flex items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={adminProfile.avatar}
                alt={adminProfile.name}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{adminProfile.name}</h2>
                  <p className="text-slate-600 mt-1">{adminProfile.role}</p>
                  <p className="text-slate-500 text-sm mt-1">{adminProfile.department}</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
                  Edit Profile
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-indigo-600">{adminProfile.stats.documentsManaged.toLocaleString()}</div>
                  <div className="text-sm text-slate-600 mt-1">Documents Managed</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-indigo-600">{adminProfile.stats.usersSupported}</div>
                  <div className="text-sm text-slate-600 mt-1">Users Supported</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-indigo-600">{adminProfile.stats.projectsCompleted}</div>
                  <div className="text-sm text-slate-600 mt-1">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <div className="text-slate-900 font-medium">{adminProfile.name}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="text-slate-900 font-medium">{adminProfile.email}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <div className="text-slate-900 font-medium">{adminProfile.role}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <div className="text-slate-900 font-medium">{adminProfile.department}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Member Since</label>
              <div className="text-slate-900 font-medium">{adminProfile.joinDate}</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Bio</h3>
          <p className="text-slate-600 leading-relaxed">{adminProfile.bio}</p>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Account Settings</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-slate-100">
            <div>
              <h4 className="font-medium text-slate-900">Email Notifications</h4>
              <p className="text-sm text-slate-600 mt-1">Receive notifications about important updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-slate-100">
            <div>
              <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
              <p className="text-sm text-slate-600 mt-1">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium border border-indigo-200 hover:border-indigo-300 rounded-xl transition-colors">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <h4 className="font-medium text-slate-900">Data Export</h4>
              <p className="text-sm text-slate-600 mt-1">Download all your data and settings</p>
            </div>
            <button className="px-4 py-2 text-slate-600 hover:text-slate-700 text-sm font-medium border border-slate-200 hover:border-slate-300 rounded-xl transition-colors">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
