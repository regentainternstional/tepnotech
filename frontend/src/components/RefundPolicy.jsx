import { Link } from "react-router-dom"
import { ArrowLeft, RefreshCw, AlertCircle, Clock, CheckCircle } from "lucide-react"

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <RefreshCw className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cancellation & Refund Policy</h1>
          <p className="text-gray-600">Last updated on 10-10-2025 17:31:04</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 space-y-8">
          {/* Introduction */}
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>TEPNO TECH SERVICES PRIVATE LIMITED</strong> believes in helping its customers as far as possible,
              and has therefore a liberal cancellation policy.
            </p>
          </div>

          {/* Policy Points */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              Under this policy:
            </h2>

            {/* Point 1 */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Immediate Cancellation Requests</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Cancellations will be considered only if the request is made immediately after placing the order.
                    However, the cancellation request may not be entertained if the orders have been communicated to the
                    vendors/merchants and they have initiated the process of shipping them.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 2 */}
            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Perishable Items</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>TEPNO TECH SERVICES PRIVATE LIMITED</strong> does not accept cancellation requests for
                    perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer
                    establishes that the quality of product delivered is not good.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 3 */}
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Damaged or Defective Items</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    In case of receipt of damaged or defective items please report the same to our Customer Service
                    team. The request will, however, be entertained once the merchant has checked and determined the
                    same at his own end.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <p className="text-sm font-semibold text-red-800 mb-2">Important Timeline:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>
                        • This should be reported within <strong>same day</strong> of receipt of the products
                      </li>
                      <li>
                        • If the product received is not as shown on the site or as per your expectations, you must
                        bring it to the notice of our customer service within <strong>same day</strong> of receiving the
                        product
                      </li>
                    </ul>
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    The Customer Service Team after looking into your complaint will take an appropriate decision.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 4 */}
            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-purple-600 mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Warranty Products</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In case of complaints regarding products that come with a warranty from manufacturers, please refer
                    the issue to them.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 5 */}
            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-green-600 mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Refund Processing Time</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In case of any Refunds approved by the <strong>TEPNO TECH SERVICES PRIVATE LIMITED</strong>, it'll
                    take <strong>1-2 Days</strong> for the refund to be processed to the end customer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about our refund policy, please contact our customer service team.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>By using our services, you agree to this cancellation and refund policy.</p>
        </div>
      </div>
    </div>
  )
}
