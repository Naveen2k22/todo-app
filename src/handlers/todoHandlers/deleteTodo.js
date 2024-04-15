import { Notification } from "@arco-design/web-react";
import axiosClient from "../../utils/axios";
import statusCodes from "../../constants/statusCodes";
import apiUrls from "../../constants/apis";

const deleteTodo = async (payload, token, onSuccess, onError) => {
  return axiosClient
    .delete(`${apiUrls.todoItems}/${payload.id}`, {
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

export default deleteTodo;
