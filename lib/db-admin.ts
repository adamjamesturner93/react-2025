import { firestore } from "./firebase-admin";
import { IFeedback, ISite } from "@typings";
import { compareDesc, parseISO } from "date-fns";

export const getAllFeedback = async (
  siteId: string,
): Promise<{ feedback?: IFeedback[]; error?: Error }> => {
  try {
    const snapshot = await firestore
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get();

    const feedback = snapshot.docs
      .map(
        (snap) =>
          ({
            id: snap.id,
            ...snap.data(),
          } as IFeedback),
      )
      .sort((a, b) =>
        compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
      );
    return { feedback };
  } catch (e) {
    const error = e as Error;
    return { error };
  }
};

export const getAllSites = async (): Promise<{ sites: ISite[] }> => {
  const snapshot = await firestore.collection("sites").get();
  const sites = snapshot.docs.map(
    (snap) =>
      ({
        id: snap.id,
        ...snap.data(),
      } as ISite),
  );
  return { sites };
};

export const getAllSitesForUser = async (
  userId: string,
): Promise<{
  sites?: ISite[];
}> => {
  const snapshot = await firestore
    .collection("sites")
    .where("authorId", "==", userId)
    .get();
  const sites = snapshot.docs.map(
    (snap) =>
      ({
        id: snap.id,
        ...snap.data(),
      } as ISite),
  );
  return { sites };
};
