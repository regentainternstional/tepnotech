import { Link } from "react-router-dom"
import { ArrowLeft, FileText, Calendar, MapPin } from "lucide-react"

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms & Conditions</h1>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated: 10-10-2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border p-8 sm:p-12">
          {/* Introduction */}
          <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-slate-700 leading-relaxed">
              These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding
              agreement by and between <strong>TEPNO TECH SERVICES PRIVATE LIMITED</strong>, ("Website Owner" or "we" or
              "us" or "our") and you ("you" or "your") and relate to your use of our website, goods (as applicable) or
              services (as applicable) (collectively, "Services").
            </p>
          </div>

          <div className="mb-8">
            <p className="text-slate-700 leading-relaxed">
              By using our website and availing the Services, you agree that you have read and accepted these Terms
              (including the Privacy Policy). We reserve the right to modify these Terms at any time and without
              assigning any reason. It is your responsibility to periodically review these Terms to stay informed of
              updates.
            </p>
          </div>

          {/* Terms List */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Terms of Use</h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  1
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  To access and use the Services, you agree to provide true, accurate and complete information to us
                  during and after registration, and you shall be responsible for all acts done through the use of your
                  registered account.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  2
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness,
                  performance, completeness or suitability of the information and materials offered on this website or
                  through the Services, for any specific purpose. You acknowledge that such information and materials
                  may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or
                  errors to the fullest extent permitted by law.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  3
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  Your use of our Services and the website is solely at your own risk and discretion. You are required
                  to independently assess and ensure that the Services meet your requirements.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  4
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  The contents of the Website and the Services are proprietary to Us and you will not have any authority
                  to claim any intellectual property rights, title, or interest in its contents.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  5
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  You acknowledge that unauthorized use of the Website or the Services may lead to action against you as
                  per these Terms or applicable laws.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  6
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  You agree to pay us the charges associated with availing the Services.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  7
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  You agree not to use the website and/or Services for any purpose that is unlawful, illegal or
                  forbidden by these Terms, or Indian or local laws that might apply to you.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  8
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  You agree and acknowledge that website and the Services may contain links to other third party
                  websites. On accessing these links, you will be governed by the terms of use, privacy policy and such
                  other policies of such third party websites.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  9
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  You understand that upon initiating a transaction for availing the Services you are entering into a
                  legally binding and enforceable contract with the us for the Services.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  10
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  You shall be entitled to claim a refund of the payment made by you in case we are not able to provide
                  the Service. The timelines for such return and refund will be according to the specific Service you
                  have availed or within the time period provided in our policies (as applicable). In case you do not
                  raise a refund claim within the stipulated time, than this would make you ineligible for a refund.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  11
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to
                  perform an obligation under these Terms if performance is prevented or delayed by a force majeure
                  event.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  12
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and
                  construed in accordance with the laws of India.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  13
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  All disputes arising out of or in connection with these Terms shall be subject to the exclusive
                  jurisdiction of the courts in Dilshad Garden, DELHI.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                  14
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">
                  All concerns or communications relating to these Terms must be communicated to us using the contact
                  information provided on this website.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900 mb-1">Jurisdiction</p>
                <p className="text-sm text-slate-600">Dilshad Garden, DELHI, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions
