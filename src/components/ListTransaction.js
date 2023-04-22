import styled from "styled-components";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br.js';

export default function ListTransaction(props) {
    dayjs.locale("pt-br");
    const {valor, tipo, descricao, data} = props;
    
    return(
    
        <ListItemContainer>
            <div>
              <span>{dayjs(data).format("DD/MM")}</span>
              <strong>{descricao}</strong>
            </div>
            <Value color={tipo}>{valor}</Value>
        </ListItemContainer> 

    )
}


const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`