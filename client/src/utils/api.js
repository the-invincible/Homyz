import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL: "https://animated-enigma-x5x759q5gpwxc57p-8000.app.github.dev/api"
});

export const getAllProperties = async() => {
    try {
        const response = await api.get("/residency/allresd", {
            timeout: 10 * 1000,
        });
        if(response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
}

export const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`, {
            timeout: 10 * 1000,
        });
        if(response.status === 400 || response.status === 500) {
            throw new Error ("API returned an error")
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
}

export const createUser = async (email, token) => {
    try {
      await api.post(
        `/user/register`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong, Please try again");
      throw error;
    }
};

  export const bookVisit = async (date, propertyId, email, token) => {
    try {
        await api.post(
            `/user/bookVisit/${propertyId}`,
            {
                email,
                id: propertyId,
                date: dayjs(date).format("DD/MM/YYYY")
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
  }

export const removeBooking = async (id, email, token) => {
    try {
        await api.post(
            `/user/removeBooking/${id}`,
            {
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
}

export const toFav = async (id, email, token) => {
    try {
        await api.post(
            `/user/toFav/${id}`,
            {
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
}


export const getAllFav = async(email, token) => {
    if(!token) return
    try {
        const res = await api.post("/user/allFav", {
            email,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data("favResidenciesId")
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
}


export const getAllBookings = async (email, token) => {
    if(!token) return
    try {
        const res = await api.post("/user/allBookings", {
            email,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    )
    return res.data["bookedVisits"];
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
}

export const createResidency = async (data, token) => {
    try {
        const res = await api.post(
            `/residency/create`,
            {
                data
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (error) {
        throw error
    }
}