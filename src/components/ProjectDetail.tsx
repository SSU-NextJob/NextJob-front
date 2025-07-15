import { getPostDetail, type PostResponse } from "@/apis/post";
import { ProjectDetailCard } from "@/components/ProjectDetailCard";
import { useEffect, useState } from "react";

export const ProjectDetail = () => {
  const [projectDetail, setProjectDetail] = useState<PostResponse>();
  useEffect(() => {
    getPostDetail(2)
      .then((res) => {
        if (res.success) setProjectDetail(res.data);
      })
      .catch()
      .finally();
  }, []);
  return <ProjectDetailCard post={projectDetail} />;
};
