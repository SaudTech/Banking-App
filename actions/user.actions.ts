"use server";

import { createAdminClient } from "@/lib/appwrite";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export const signIn = async ({email, password}: { email: string; password: string }) => {
  try {
    const { account } = await createAdminClient();
    const user = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", user.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      userData.firstName + " " + userData.lastName
    );

    console.log(newUserAccount);

    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error(error);
  }
};
