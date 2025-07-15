import { getUserDetailAPI, type UserData, getUserProjectAPI, type UserProjectListResponse } from "@/apis/user";
import { UserDetailCard } from "@/components/UserDetailCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UserDetail = () => {
  const { id } = useParams(); 
  const [userDetail, setUserDetail] = useState<UserData>();
  const [userProjectList, setUserProjectList] = useState<UserProjectListResponse>();

  useEffect(() => {
    if (!id) return;
    getUserDetailAPI(parseInt(id))
      .then((res) => {
        if (res.success) setUserDetail(res.data);
      })
      .catch()
      .finally();

     getUserProjectAPI(parseInt(id))
      .then((res) => {
        if (res.success) setUserProjectList(res); 
      })
      .catch(console.error);
  }, []);

  if (!userDetail || !userProjectList) return null;
  return <UserDetailCard user={userDetail} userProject={userProjectList}  />;
};
