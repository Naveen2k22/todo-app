import { Notification } from "@arco-design/web-react";
import apiUrls from "../../constants/apis";
import axiosClient from "../../utils/axios";
import statusCodes from "../../constants/statusCodes";

const getTodoList = (token, onSuccess, onError) => {
  axiosClient
    .get(apiUrls.todoItems, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => onSuccess(res))
    .catch((err) => {
      const response = err.response;

      if (response?.status === statusCodes.internalServerError) {
        Notification.error({
          closable: true,
          title: "Error: 500",
          content: "Something went wrong.",
        });
      }

      onError(err.response);
    });
};

export default getTodoList;
