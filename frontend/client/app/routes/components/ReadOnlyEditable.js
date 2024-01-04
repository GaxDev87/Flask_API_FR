import UsersList from "./UsersList";
import { Layout } from "./layout";
import { Link } from "@remix-run/react";

const ReadOnlyEditable = ({item}) =>{
  return (
    <tr key={item.usuario.id}>
    <td className='text-white font-bold size-15'>{item.usuario.id}</td>
    <td className='text-white font-bold size-15'>{item.usuario.firstName}</td>
    <td className='text-white font-bold size-15'>{item.usuario.lastName}</td>
    <td className='text-white font-bold size-15'>{item.usuario.email}</td>
    <td className='text-white font-bold size-15'>{item.usuario.user_Type}</td>
    <td>
    <div className="select-container">
      <select
        value=""
        onChange={() => this.props.handleClickManage(item.usuario.id)}
      >
        <option disabled value="">
          Cambiar rol de usuario
        </option>
        <option value={this.props.getOppositeUserRole(item.usuario.user_Type)}>
          {this.props.getOppositeUserRole(item.usuario.user_Type)}
        </option>
      </select>
      </div>
      
    </td>
    <td>
      <Link
        to="#"
        onClick={() => this.props.handleClickEdit(item.usuario.id)}
        className="DeleteLink"
      >
        <TbEdit />
      </Link>
    </td>

 
    <td>
      <Link
        to="#"
        onClick={() => this.props.handleClickDelete(item.usuario.id)}
        className="DeleteLink"
      >
        <FaTrash />
      </Link>
    </td>   
  </tr>
  
  );
}

export default ReadOnlyEditable;







