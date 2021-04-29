
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class GetURLApp extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen2bwebapp.herokuapp.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0")

	val headers_0 = Map("Origin" -> "https://www.google.com")

	val headers_2 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"If-Modified-Since" -> "Thu, 22 Apr 2021 20:21:19 GMT",
		"If-None-Match" -> """W/"c05-178fb3e7a18"""",
		"Upgrade-Insecure-Requests" -> "1")

    val uri1 = "https://www.google.com/gen_204"

	val scn = scenario("GetURLApp")
		.exec(http("request_0")
			.post(uri1 + "?atyp=i&ei=g_OBYKHvBMGnrgTeoJDoBg&ct=slh&v=t1&m=HV&pv=0.845252179778952&me=1:1619129221776,x:11,V,0,0,1366,654:0,N,1,g_OBYKHvBMGnrgTeoJDoBg:0,R,1,1,0,0,1366,654:3,B,654:7956,h,1,1,i:62,h,1,1,o:1739,e,B&zx=1619129231550")
			.headers(headers_0)
			.resources(http("request_1")
			.post(uri1 + "?atyp=i&ei=g_OBYKHvBMGnrgTeoJDoBg&ct=slh&v=t1&pv=0.845252179778952&me=9:1619129231551,V,0,0,0,0:514,h,1,1,i:432,h,1,1,o:1041,h,1,1,i:362,h,1,1,o:205,V,0,0,1366,654:17,e,B&zx=1619129234123")
			.headers(headers_0)))
		.pause(2)
		.exec(http("request_2")
			.get("/")
			.headers(headers_2)
			.resources(http("request_3")
			.post(uri1 + "?atyp=i&ei=g_OBYKHvBMGnrgTeoJDoBg&ct=slh&v=t1&pv=0.845252179778952&me=16:1619129234135,V,0,0,0,0:2848,V,0,0,1366,654:221,e,H&zx=1619129237206")
			.headers(headers_0)))

	setUp(scn.inject(rampUsersPerSec(1) to 5 during (20 seconds))).protocols(httpProtocol)
}