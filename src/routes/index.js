
import PrivateRoute from "../components/PrivateRoute"
import LayoutDashboard from "../layout/LayoutDashboard"
import LayoutDefault from "../layout/LayoutDefault"
import Admin from "../page/Admin"
import CVManage from "../page/CVManage"
import CVDetail from "../page/CVManage/CVDetail.js"
import Company from "../page/Company"
import CompanyDetail from "../page/Company/CompanyDetail"
import Home from "../page/Home"
import InforCompany from "../page/InforCompany"
import Job from "../page/Job"
import JobDetail from "../page/JobDetail"
import JobManage from "../page/JobManage"
import CreateJob from "../page/JobManage/createJob"
import Login from "../page/Login"
import Register from "../page/Register"
import Search from "../page/Search"
export const routes = [
  {
    element : <LayoutDefault />,
    children: [
      {
        path: "/",
        element : <Home/>,
        children : [
          {
            path: "/",
            element : <Company />
          }
        ]
      },
      {
        path: "/company",
        element : <Company />
      },
      {
        path: "/company/:id",
        element : <CompanyDetail />
      }
      ,
      {
        path: "/search",
        element : <Search />
      },
      {
        path: "/job/:id",
        element : <Job />
      },
      {
        path: "/login",
        element : <Login />
      },
      {
        path: "/register",
        element : <Register />
      }
    ]
  },
  {
    element : <PrivateRoute />,
    children : [
      {
        element : <LayoutDashboard />,
        children: [
          {
            path: "/admin",
            element : <Admin />
          },
          {
            path: "/infor-company",
            element : <InforCompany />
          },
          {
            path: "/job-manage",
            element : <JobManage />
          },
          {
            path: "/job-detail/:id",
            element : <JobDetail />
          },
          {
            path: "/create-job",
            element : <CreateJob />
          },
          {
            path: "/cv-manage",
            element : <CVManage />
          },
          {
            path: "/cv-detail/:id",
            element : <CVDetail />
          },
        ]
      },
    ]
  }
]
