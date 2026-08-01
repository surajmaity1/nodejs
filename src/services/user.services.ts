import { createUser, findUserByEmail } from "@/repositories/user.repository";
import { UserDetails } from "@/types/auth";

export const createOrUpdateUserDetails = async(userData: UserDetails) => {
    try {
        const existUser = await findUserByEmail(userData.email);

        if (existUser) {
            return existUser;
        }

        const userDetails = {
            signInProviderId: userData.id,
            name: userData.name,
            email: userData.email,
            image: userData.picture,
            signInProvider: "GOOGLE"
        }

        return await createUser(userDetails);
    } catch (error) {
        throw error;
    }
}