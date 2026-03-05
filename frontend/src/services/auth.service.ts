import { api } from "@/lib/axios";
import { LoginInput, RegisterInput } from "@/types/auth.types";
import { ApiResponse } from "@/types/api.types";

import { UserRole } from "@/types/auth.types";

export interface AuthResponseData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

export const authService = {
  login: async (data: LoginInput) => {
    // START DUMMY AUTH FOR PHASE: UI DEMO
    if (data.email === "admin@pixelcypher.com" && data.password === "Admin@123") {
      return new Promise<import("axios").AxiosResponse<ApiResponse<AuthResponseData>>>((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              success: true,
              message: "Login successful",
              data: {
                token: "dummy-jwt-token-123",
                user: {
                  id: "1",
                  name: "System Admin",
                  email: "admin@pixelcypher.com",
                  role: "admin",
                },
              },
            },
            status: 200,
            statusText: "OK",
            headers: {},
            config: { headers: {} } as import("axios").InternalAxiosRequestConfig,
          });
        }, 1000); // Simulate 1s network latency
      });
    } else if (data.email || data.password) {
      return new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject({
            response: {
              data: {
                message: "Invalid email or password",
              }
            }
          });
        }, 1000);
      });
    }
    // END DUMMY AUTH

    // Actual API fallback
    return api.post<ApiResponse<AuthResponseData>>("/auth/login", data);
  },

  register: (data: RegisterInput) =>
    api.post<ApiResponse<AuthResponseData>>("/auth/register", data),
};
