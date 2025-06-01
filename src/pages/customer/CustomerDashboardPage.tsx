import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const CustomerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [recentActivity, setRecentActivity] = useState<Array<{
    type: 'check-in' | 'check-out';
    timestamp: Date;
  }>>([]);

  const handleCheckIn = () => {
    const now = new Date();
    setIsCheckedIn(true);
    setCheckInTime(now);
    setRecentActivity(prev => [{
      type: 'check-in',
      timestamp: now
    }, ...prev]);
    toast.success('Successfully checked in!');
  };

  const handleCheckOut = () => {
    const now = new Date();
    setIsCheckedIn(false);
    setCheckInTime(null);
    setRecentActivity(prev => [{
      type: 'check-out',
      timestamp: now
    }, ...prev]);
    toast.success('Successfully checked out!');
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-500">Track your gym activity and membership status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Check In/Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <p className="text-lg font-semibold flex items-center">
                    {isCheckedIn ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Checked In
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-gray-500 mr-2" />
                        Not Checked In
                      </>
                    )}
                  </p>
                </div>
                {checkInTime && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Check-in Time</p>
                    <p className="text-lg font-semibold">
                      {checkInTime.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </div>
                )}
              </div>

              {isCheckedIn ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCheckOut}
                  leftIcon={<XCircle size={18} />}
                >
                  Check Out
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleCheckIn}
                  leftIcon={<CheckCircle size={18} />}
                >
                  Check In
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="text-lg font-semibold">Premium Membership</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valid Until</p>
                <p className="text-lg font-semibold">June 30, 2025</p>
              </div>
              <div className="pt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">65 days remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">
                      {activity.type === 'check-in' ? 'Checked In' : 'Checked Out'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-center text-gray-500 py-4">No recent activity</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboardPage;