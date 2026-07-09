import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import AdminLogin from './pages/admin/Login'
import AdminLayout from './pages/admin/Layout'
import AdminProducts from './pages/admin/Products'
import AddEditProduct from './pages/admin/AddEditProduct'
import AdminConfig from './pages/admin/Config'

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/products/new">
        <AdminLayout><AddEditProduct /></AdminLayout>
      </Route>
      <Route path="/admin/products/:id/edit">
        <AdminLayout><AddEditProduct /></AdminLayout>
      </Route>
      <Route path="/admin/config">
        <AdminLayout><AdminConfig /></AdminLayout>
      </Route>
      <Route path="/admin/products">
        <AdminLayout><AdminProducts /></AdminLayout>
      </Route>
      <Route path="/admin">
        <AdminLayout><AdminProducts /></AdminLayout>
      </Route>
    </Switch>
  )
}
