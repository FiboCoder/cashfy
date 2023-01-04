import { useRoute } from "@react-navigation/native";
import TransactionDetails from "../../screens/transactions/TransactionDetails";

const TransactionDetailsController = () =>{

    const route = useRoute();

    return(

        <TransactionDetails transaction={route.params.transaction} route={route.params.route}></TransactionDetails>
    );
}

export default TransactionDetailsController;