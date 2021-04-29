
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class TagsMapInfo extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen2bwebapp.herokuapp.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map(
		"Content-Type" -> "application/json; charset=UTF-8",
		"Origin" -> "null")

	val headers_2 = Map("Accept" -> "image/webp,*/*")

	val headers_6 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_7 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/add",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_10 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/location/near",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_11 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri1 = "https://maps.googleapis.com/maps/api/js"
    val uri2 = "https://www.googleapis.com/geolocation/v1/geolocate"
    val uri4 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("TagsMapInfo")
		.exec(http("request_0")
			.get("/?code=6d8f4420bfff0ade5694e7f259671322&state=a39a5b9e59b24daa804b4df72b7ae4a6")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.post(uri2 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/tagsmapinfo/0001_request.json")))
		.pause(2)
		.exec(http("request_2")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_2))
		.pause(1)
		.exec(http("request_3")
			.get(uri1 + "/ViewportInfoService.GetViewportInfo?1m6&1m2&1d43.5101997593902&2d-5.721748781290409&2m2&1d43.53858871781209&2d-5.632918814615446&2u16&4ses-ES&5e0&6sm%40554000000&7b0&8e0&12e2&callback=_xdc_._15rmv&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=31171")
			.resources(http("request_4")
			.get(uri1 + "/AuthenticationService.Authenticate?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&4sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&callback=_xdc_._iwjf4g&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=72827"),
            http("request_5")
			.get(uri1 + "/QuotaService.RecordEvent?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&3sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&7stgezmp&10e1&callback=_xdc_._7sy4ju&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=121330")))
		.pause(1)
		.exec(http("request_6")
			.options(uri4 + "/add")
			.headers(headers_6)
			.resources(http("request_7")
			.post(uri4 + "/add")
			.headers(headers_7)
			.body(RawFileBody("/tagsmapinfo/0007_request.json")),
            http("request_8")
			.options(uri4 + "/location/near")
			.headers(headers_6),
            http("request_9")
			.options(uri4 + "/getById")
			.headers(headers_6),
            http("request_10")
			.post(uri4 + "/location/near")
			.headers(headers_10)
			.body(RawFileBody("/tagsmapinfo/0010_request.json")),
            http("request_11")
			.post(uri4 + "/getById")
			.headers(headers_11)
			.body(RawFileBody("/tagsmapinfo/0011_request.json"))))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}