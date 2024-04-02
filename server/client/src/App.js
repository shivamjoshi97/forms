import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { AppContext } from './store/AppContext';
import Login from './Login';
import Admin from './Admin';
import User from './User';
import Table from './components/Table'
import AuditDetails from './components/AuditDetails';
import FormDetails from './components/FormDetails';
import TimeCheckForm from './components/TimeCheck/TimeCheckForm';
import FirstFiveForm from './components/FirstFive/FirstFiveForm';
import DailyProcessForm from './components/DailyProcess/DailyProcessForm';
import DailyLineForm from './components/DailyLine/DailyLineForm';
import FormView from './components/FormView';
import CreateTemplate from './components/Template/CreateTemplate';
import CustomForm from './components/CustomForm/CustomForm';
import CustomFormView from './components/CustomForm/CustomFormView';
import CustomFormEdit from './components/CustomForm/CustomFormEdit';
import TimeCheckView from './components/TimeCheck/TimeCheckView';
import DailylineView from './components/DailyLine/DailyLineView';
import DailyProcessView from './components/DailyProcess/DailyProcessView';
import FirstFiveView from './components/FirstFive/FirstFiveView';
import F_11Form from './components/F_11/F_11Form';
import F_11View from './components/F_11/F_11View';
import AllTemplates from './components/Template/AllTemplates';
import './App.css';

function App() {
  return (
    <AppContext>
      <Routes>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route path='/user' element={<User/>}>
          <Route index element={<Table/>}/>
          <Route path="auditdetails" element={<AuditDetails/>}/>
          <Route path="form/:auditid" element={<FormDetails/>}/>
          <Route path="formdemo/:auditid" element={<F_11Form/>}/>
          <Route path="formview/:auditid" element={<F_11View/>}/>
          <Route path="timecheck/:auditid" element={<TimeCheckForm/>}/>
          <Route path="timecheckview/:auditid" element={<TimeCheckView/>}/>
          <Route path="firstfive/:auditid" element={<FirstFiveForm/>}/>
          <Route path="firstfiveview/:auditid" element={<FirstFiveView/>}/>
          <Route path='dailyprocess/:auditid' element={<DailyProcessForm/>}/>
          <Route path='dailyprocessview/:auditid' element={<DailyProcessView/>}/>
          <Route path='dailyline/:auditid' element={<DailyLineForm/>}/>
          <Route path='dailylineview/:auditid' element={<DailylineView/>}/>
          <Route path='customfrom/:templateid' element={<CustomForm/>}/>
          <Route path='customfromview/:customid' element={<CustomFormView/>}/>
          <Route path='customfromedit/:customid' element={<CustomFormEdit/>}/>
          <Route path='createtemplate' element={<CreateTemplate/>}/>
          <Route path='alltemplate' element={<AllTemplates/>}/>
          <Route path='formview' element={<FormView/>}/>
        </Route>
        <Route path='/admin' element={<Admin/>}>
          <Route index element={<AllTemplates/>}/>
          <Route path='createtemplate' element={<CreateTemplate/>}/>
        </Route>
      </Routes>
    </AppContext>
  );
}

export default App;
