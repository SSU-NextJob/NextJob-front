interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

interface HeaderAlarmProps {
  alarmLists: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export const HeaderAlarm = ({
  alarmLists,
  onMarkAsRead,
  onMarkAllAsRead,
}: HeaderAlarmProps) => {
  return (
    <div className="absolute right-36 top-12 w-80 bg-white border shadow-lg rounded-xl z-50 text-left">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <span className="font-semibold text-sm text-gray-900">알림</span>
        <button
          className="text-xs text-blue-600 hover:underline"
          onClick={onMarkAllAsRead}
        >
          모두 읽음 처리
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {alarmLists.map((alarm) => (
          <div
            key={alarm.id}
            onClick={() => onMarkAsRead(alarm.id)}
            className={`px-4 py-3 border-b cursor-pointer transition ${
              alarm.unread ? "bg-blue-50" : "bg-white"
            }`}
          >
            <div className="font-semibold text-sm text-gray-900 flex items-center">
              {alarm.title}
              {alarm.unread && (
                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
            <p className="text-sm text-gray-600">{alarm.description}</p>
            <p className="text-xs text-gray-500 mt-1">{alarm.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
