import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-gray-200 pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-6">
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          
          
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              FreelancePro
            </h3>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              Connecting freelancers with projects.  
              <span className="text-emerald-300"> Simple.</span>  
              <span className="text-teal-300"> Fast.</span>  
              <span className="text-cyan-300"> Reliable.</span>
            </p>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-emerald-400 transition-colors duration-200">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Get Started</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signup" className="hover:text-emerald-400 transition-colors duration-200">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition-colors duration-200">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-400 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

       
        <div className="border-t border-emerald-700 mt-10 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Freelance SaaS Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
