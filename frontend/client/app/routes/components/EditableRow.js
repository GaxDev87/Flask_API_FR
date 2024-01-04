import { Layout } from "./components/layout";
import { Link } from "@remix-run/react";

const EditableRow = () => {
    return (

        <tr>

            <td><input type="text" required="required"
                    placeholder="Enter a name...."
                    name="firstName"></input></td>
            <td> <input type="text" required="required"
                    placeholder="Enter a name...."
                    name="firstName"></input></td>
            <td> <input type="text" required="required"
                    placeholder="Enter a name...."
                    name="firstName"></input></td>
            <td> <input type="text" required="required"
                    placeholder="Enter a name...."
                    name="firstName"></input></td>
            <td> <input type="text" required="required"
                    placeholder="Enter a name...."
                    name="firstName"></input></td>



        </tr>

    );
}

export default EditableRow
