import axiosInstance from "../utils/axiosInstance";

// 🔐 AUTH ENDPOINTS

// إرسال OTP إلى البريد الإلكتروني
export const sendOTP = async (email) => {
  return axiosInstance.post("/auth/forget-password", { email });
};

// التحقق من OTP
export const verifyOTP = async (email, otp) => {
  return axiosInstance.post("/otp/verify", {
    email,
    otp,
    useCase: "RESET_PASSWORD",
  });
};

// إعادة تعيين كلمة المرور
export const resetPassword = async (userId, password, otp) => {
  return axiosInstance.patch("/auth/reset-password", {
    userId,
    password,
    otp,
  });
};

// 📥 GENERAL REQUESTS FETCHING

// جلب كل الطلبات المعلقة (للإعادة الاستخدام)
export const fetchPendingRequests = async () => {
  const res = await axiosInstance.get("/admin/pending-requests");
  return res.data.data;
};

// جلب طلبات المستخدمين من نوع PROFILE
export const fetchPendingUsers = async () => {
  const requests = await fetchPendingRequests();
  const filtered = requests.filter(
    (item) => item.type === "PROFILE_UPDATE" || item.type === "PROFILE_COMPLETE"
  );

  return filtered.flatMap((request) =>
    (request.items || []).map((item) => {
      const data = item.data || {};
      return {
        id: request.id,
        firstName: data.firstName || "no name",
        lastName: data.lastName || "no name",
        request_type: request.type,
      };
    })
  );
};

// جلب طلبات إنشاء أو تعديل شقق
export const fetchApartmentRequests = async () => {
  const requests = await fetchPendingRequests();
  return requests.filter(
    (item) =>
      item.type === "CREATE_APARTMENT" || item.type === "UPDATE_APARTMENT"
  );
};

// 📄 SINGLE REQUEST DATA

// جلب بيانات طلب محدد
export const fetchRequestById = async (id) => {
  const res = await axiosInstance.get(`/admin/request/${id}`);
  return res.data.data;
};

// 📦 ITEMS & IMAGES

// الموافقة على عنصر (Apartment, Room, Bed)
export const approveItem = async (id) => {
  return axiosInstance.patch(`/admin/item-approval`, {
    id,
    status: "APPROVED",
  });
};

// الموافقة على صورة واحدة
export const approveImage = async (imgId) => {
  return axiosInstance.patch(`/admin/${imgId}/image-approval`, {
    status: "APPROVED",
  });
};

// 📤 STATUS MANAGEMENT
// الموافقة أو الرفض على الطلب بالكامل
export const approveRequestStatus = async (id, status) => {
  return axiosInstance.patch(`/admin/request-approval`, {
    id,
    status,
  });
};

// تحديث حالة الطلب – تستخدم في صفحات الإدارة
export const updateRequestStatus = async (id, status) => {
  return axiosInstance.patch("/admin/request-approval", {
    id,
    status,
  });
};

////////////////////////////
// 👤 USERS ENDPOINTS    //
////////////////////////////

// جلب المستخدمين وتصفية الطلاب والمزودين فقط
export const fetchUsersList = async () => {
  const res = await axiosInstance.get("/users");
  return res.data.data
    .filter((item) => item.role === "STUDENT" || item.role === "PROVIDER")
    .map((item) => ({
      id: item.id,
      name: `${item.student?.firstName || ""} ${item.student?.lastName || ""}`,
      email: item.email,
      age: null, // يمكن تعديلها لاحقًا إذا توفرت
      city: null,
      university: item.student?.university || "",
      faculty: item.student?.major || "",
      year: item.student?.level || "",
      gender: item.student?.gender || "",
    }));
};

// حذف مستخدم
export const deleteUserById = async (id) => {
  return axiosInstance.delete(`/users/${id}`);
};

///////////////////////
// 🔐 AUTH ENDPOINTS //
///////////////////////

// تسجيل الدخول
export const login = async (email, password) => {
  return axiosInstance.post("/auth/login", { email, password });
};

export const fetchRentalRequestsForProvider = async (getApartmentImageFn) => {
  const res = await axiosInstance.get("/rental-requests/provider");

  if (!res.data.success) return [];

  const requestsData = res.data.data;

  const formatted = await Promise.all(
    requestsData.map(async (item) => {
      const apartmentId = item.bed?.room?.apartment?.id || "";
      const apartmentImage = await getApartmentImageFn(apartmentId);

      return {
        id: item.id,
        apartmentId,
        apartmentTitle: item.bed?.room?.apartment?.title || "N/A",
        apartmentImage,
        price: Number(item.bed?.price) || 0,
        status: item.status || "UNKNOWN",
        createdAt: item.createdAt,
        student: {
          name: `${item.student?.firstName || ""} ${
            item.student?.lastName || ""
          }`.trim(),
          image: item.student?.image || "/default-avatar.png",
        },
      };
    })
  );

  return formatted;
};

export const fetchRentalRequestDetails = async (id) => {
  const res = await axiosInstance.get(`/rental-requests/provider/${id}`);
  return res.data.data;
};

// جلب كل الصور المرتبطة بالشقة (Apartment + Rooms + Beds)
export const fetchApartmentImagesBundle = async (apartmentId) => {
  const res = await axiosInstance.get(
    `/image/apartments/${apartmentId}/images`
  );
  return res.data.data;
};

// تغيير حالة الطلب (موافقة أو رفض)
export const setRentalRequestStatus = async (id, status) => {
  return axiosInstance.post("/admin/request-approval", {
    id,
    status,
  });
};
