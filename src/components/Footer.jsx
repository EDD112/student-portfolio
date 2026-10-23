import { profile } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          &copy; {year} {profile.name}. All rights reserved.
        </p>
        <p className="footer__note">Built with React &amp; Vite.</p>
      </div>
    </footer>
  )
}
