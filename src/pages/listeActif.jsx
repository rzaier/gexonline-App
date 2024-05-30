import React ,{useState} from 'react';
import { View } from 'react-native';
import ButtomBar from '../Component/buttomBar';
import Menuheader from '../Component/menuheader';
import Liste from '../Component/liste'

const ListeActif = ({ token }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  return (
    <View>
      <Menuheader setSelectedClient={setSelectedClient} token={token}  selectedClient={selectedClient} />
      <Liste selectedClient={selectedClient} token={token} setSelectedClient={setSelectedClient}/>
      {/* <ButtomBar /> */}
    </View>
  );
}

export default ListeActif;

