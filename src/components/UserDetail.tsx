import {
  getUserDetailAPI,
  type UserData,
  getUserProjectAPI,
  type UserProjectListResponse,
} from "@/apis/user";
import { UserDetailCard } from "@/components/UserDetailCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "@/components/atoms/Loading";
import { useLoadingStore } from "@/store/loadingStore";

export const UserDetail = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<UserData>();
  const [userProjectList, setUserProjectList] =
    useState<UserProjectListResponse>();
  const loadingStore = useLoadingStore();

  useEffect(() => {
    if (!id) return;
    loadingStore.setLoading("userDetail", true);
    getUserDetailAPI(parseInt(id))
      .then((res) => {
        if (res.success) setUserDetail(res.data);
      })
      .catch()
      .finally(() => loadingStore.setLoading("userDetail", false));

    loadingStore.setLoading("userDetail", true);
    getUserProjectAPI(parseInt(id))
      .then((res) => {
        if (res.success) setUserProjectList(res);
      })
      .catch(console.error)
      .finally(() => loadingStore.setLoading("userDetail", false));
  }, []);

  if (loadingStore.isLoading("userDetail")) return <Loading />;
  if (!userDetail || !userProjectList) return null;
  return <UserDetailCard user={userDetail} userProject={userProjectList} />;
};
