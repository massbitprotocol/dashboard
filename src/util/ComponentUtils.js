// sync object props
export function syncVmodelObject(fieldNames, prop = "value") {
  return fieldNames.reduce((acc, fieldName) => {
    acc[fieldName] = {
      get() {
        return this[prop][fieldName];
      },
      set(val) {
        this.$emit("input", { ...this[prop], [fieldName]: val });
      }
    };
    return acc;
  }, {});
}
export function combineOptionWithFilter(filter, options) {
  const { sortBy, sortDesc, page = 1, itemsPerPage = 10 } = options;
  return {
    ...filter,
    limit: itemsPerPage,
    skip: (page - 1) * itemsPerPage
  };
}
// time utils
import moment from "moment";
export const displayTime = (time, format = "LLL") =>
  moment(time).format(format);

// alert, confirm utils
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
// import { i18n } from "../plugins/vuetify";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export const successAlert = props =>
  customAlert({
    confirmButtonText: "OK",
    title: "SUCCESS",
    text: "",
    ...props,
    icon: "success"
  });
export const failAlert = props =>
  customAlert({
    confirmButtonText: "OK",
    title: "ERROR",
    text: "",
    ...props,
    icon: "error"
  });
export const confirm = props =>
  customAlert({
    title: "CONFIRM",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
    cancelButtonText: "CANCEL",
    ...props
  });
export const customAlert = props =>
  props?.toast ? Toast.fire(props) : Swal.fire(props);
