import { SupportServices } from "../../../app/modules/support/support.service";
import { VendorServices } from "../../../app/modules/vendor/vendor.service";
import { kafkaConsumer } from "../kafka-producers/kafka.consumer";

export const peptideConsumer = async () => {
    await kafkaConsumer({
        groupId: "peptide", topic: "peptide", cb: async (data: { type: string, data: any }) => {
            try {

                switch (data.type) {
                    case 'bulk-upload':
                        await VendorServices.buldVendorsFromExcel(data.data);
                        break;
                    case 'create':
                        await VendorServices.createVendorIntoDB(data.data);
                        break;
                    case "send-support-message":
                        await SupportServices.sendSupportMessageToAdmin(data.data);
                        break;
                    case "reply-to-support-message":
                        await SupportServices.replyToSupportMesseage(data.data.id, data.data.message);
                        break;
                    default:
                        console.log('Invalid type');
                        break;
                }

            } catch (error) {
                console.log(error);
            }
        }
    })
};