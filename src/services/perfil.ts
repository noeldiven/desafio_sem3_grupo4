import { api } from "../lib/axios";

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar_url: string | null;
}

export const perfilService = {
  obtener: () => api.get<UserProfile>("/auth/me").then((r) => r.data),

  actualizar: async (
    nombre: string,
    foto?: File,
  ): Promise<UserProfile> => {
    const formData = new FormData();

    formData.append("name", nombre);

    if (foto) {
      formData.append("foto", foto);
    }

    const response = await api.put<UserProfile>(
      "/auth/perfil",
      formData,
    );

    return response.data;
  },
};