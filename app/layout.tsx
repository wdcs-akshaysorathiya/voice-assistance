import '@/styles/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const RootLayout = ({ children }:any) => {

  return (
    <html lang="en">
      <body>
        {/* Wrapping this as the toast container throws a console error */}
        {children}
      </body>
    </html >
  )
}

export default RootLayout