import { signInWithGoogle } from "@/utils/db/servicefirebase";

export const socialAuth = async (data: {
  fullname: string;
  email: string;
  image?: string;
  type: string;
}) => {
  try {
    const response: any = await new Promise((resolve) => {
      signInWithGoogle(data, (res: any) => {
        resolve(res);
      });
    });

    if (response?.status) {
      return {
        fullname: data.fullname,
        email: data.email,
        image: data.image || null,
        type: data.type,
        role: response.data.role?.trim() || "user",
      };
    }

    return null;
  } catch (error) {
    console.error("SocialAuth Error:", error);
    return null;
  }
};