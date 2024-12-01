import { firestoreClient } from "../common/services/firestore.service";
import { v4 as uuidv4 } from "uuid";

interface Conversation {
  participants: string[];
  project_name: string;
}

/**
 * Adds a new conversation to the Firestore 'conversations' collection.
 * The timestamp is generated within the function.
 * @param conversationData - The conversation data to add.
 * @returns The unique ID of the added conversation.
 */
export async function addConversation(
  conversationData: Conversation,
): Promise<string> {
  try {
    // Generate a unique ID for the conversation
    const conversationId = uuidv4();

    // Prepare the data to be stored with a dynamically generated timestamp
    const data = {
      id: conversationId,
      ...conversationData,
      timestamp: new Date().toISOString(),
    };

    // Use the Firestore client to add the data
    const addedConversationId = await firestoreClient.setData(
      "conversations",
      conversationId,
      data,
    );

    console.log(
      `Conversation added successfully with ID: ${addedConversationId}`,
    );
    return addedConversationId;
  } catch (error: any) {
    console.error("Error adding conversation:", error);
    throw new Error(`Failed to add conversation: ${error.message}`);
  }
}
