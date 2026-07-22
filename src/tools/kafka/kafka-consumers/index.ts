import { peptideConsumer } from "./peptide.consumer";
import { userConsumer } from "./user.consumer";

export async function loadConsumer() {
    await Promise.all([peptideConsumer()]);
    console.log("consumer loaded");
}