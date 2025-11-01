import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { WorkspaceUser } from "@/apis/workspace";

interface AssigneeDropdownProps {
  users: WorkspaceUser[];
  selectedUserIds: number[];
  onUserSelect: (userIds: number[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const AssigneeDropdown = ({
  users,
  selectedUserIds,
  onUserSelect,
  placeholder = "담당자를 선택하세요",
  disabled = false,
}: AssigneeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedUsers = users.filter(user => selectedUserIds.includes(user.userId));
  const displayText = selectedUsers.length > 0 
    ? selectedUsers.map(user => user.name).join(", ")
    : placeholder;

  const handleUserToggle = (userId: number) => {
    if (selectedUserIds.includes(userId)) {
      onUserSelect(selectedUserIds.filter(id => id !== userId));
    } else {
      onUserSelect([...selectedUserIds, userId]);
    }
  };

  const handleClearAll = () => {
    onUserSelect([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.assignee-dropdown')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="assignee-dropdown relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'}
          transition-colors duration-200
        `}
      >
        <div className="flex items-center justify-between">
          <span className={`truncate ${selectedUsers.length === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
            {displayText}
          </span>
          <ChevronDown 
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {users.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">
              사용자가 없습니다
            </div>
          ) : (
            <>
              {selectedUsers.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 border-b border-gray-200"
                >
                  모든 선택 해제
                </button>
              )}
              {users.map((user) => (
                <div
                  key={user.userId}
                  onClick={() => handleUserToggle(user.userId)}
                  className={`
                    px-3 py-2 cursor-pointer text-sm transition-colors duration-150
                    ${selectedUserIds.includes(user.userId) 
                      ? 'bg-blue-50 text-blue-900' 
                      : 'text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs text-gray-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(user.userId)}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};