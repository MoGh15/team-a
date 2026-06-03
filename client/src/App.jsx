import PersonalData from './components/personal-data/PersonalData';
import './App.css'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
              Praxis Management System
            </h1>
          </div>

        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <PersonalData />
        </div>
      </div>
    </>
  )
}

export default App
