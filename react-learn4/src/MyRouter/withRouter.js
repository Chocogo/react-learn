import { RouterContext } from "./RouterContext"

const withRouter = Component => props => {
  return <RouterContext.Consumer>
    {
      context => {
        return <Component {...context} {...props} />
      }
    }
  </RouterContext.Consumer>
}
export default withRouter