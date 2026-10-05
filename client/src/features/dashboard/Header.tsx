import { useLocation } from 'react-router-dom';

export default function Header({ patientInfo } : any) {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Patient Health Overview Dashboard';
      case '/chat':
        return 'AI Symptom Checker & Health Assistant';
      case '/doctors':
        return 'Specialist Doctor Directory';
      case '/appointments':
        return 'My Scheduled Appointments';
      case '/emergency':
        return 'Emergency Contacts & First Aid';
      case '/remedies':
        return 'Natural Home Remedies';
      case '/about':
        return 'About HealthAI Project';
      default:
        return 'Healthcare System';
    }
  };

  return (
    <header className="header flex flex-row bg-amber-500 justify-between items-center px-4 py-4">
      <div className="header-title">
        <h1 className='text-m font-bold'>{getTitle()}</h1>
        <div className="status-indicator text-sm flex items-center gap-1.5 text-gray-600">
          <span className="status-dot bg-green-500 rounded-full text-m w-2 h-2"></span> 
          Engine Active
        </div>
      </div>

      <div className="header-user-badge flex items-center gap-2.5 px-2 border bg-blue-400 border-amber-950 rounded-full">
        <div className="user-avatar-small text-sm">👤</div>
        <div className="user-meta flex flex-col gap-2 py-1.5 leading-none">
          <span className="user-name-small text-[12px] font-bold">{patientInfo.name}</span>
          <span className="user-status-text text-[10px]">Patient • ID #{patientInfo.id}</span>
        </div>
      </div>
    </header>
  );
}
