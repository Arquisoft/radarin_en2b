
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class NearbyFriendsInMapDisplayed extends Simulation {

	val httpProtocol = http
		.baseUrl("https://www.googleapis.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0")

	val headers_0 = Map(
		"Content-Type" -> "application/json; charset=UTF-8",
		"Origin" -> "null")

	val headers_1 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_3 = Map("Accept" -> "image/webp,*/*")

	val headers_5 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_6 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/location/near",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_10 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/add",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_12 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri1 = "https://maps.googleapis.com/maps/api/js"
    val uri3 = "https://radarinen2bwebapp.herokuapp.com"
    val uri4 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("NearbyFriendsInMapDisplayed")
		.exec(http("request_0")
			.post("/geolocation/v1/geolocate?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_0)
			.resources(http("request_1")
			.get(uri3 + "/?code=9d13958d55feb07ed69df842b7cab52f&state=9c673045d82d4308841107667ac9a225")
			.headers(headers_1)))
		.pause(2)
		.exec(http("request_2")
			.post("/geolocation/v1/geolocate?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_0)
			.body(RawFileBody("/nearbyfriendsinmapdisplayed/0002_request.json")))
		.pause(1)
		.exec(http("request_3")
			.get(uri3 + "/static/media/logo.6ce24c58.svg")
			.headers(headers_3))
		.pause(1)
		.exec(http("request_4")
			.get(uri1 + "/ViewportInfoService.GetViewportInfo?1m6&1m2&1d43.51019723497053&2d-5.721748449320086&2m2&1d43.53858619174533&2d-5.632918487798951&2u16&4ses-ES&5e0&6sm%40554000000&7b0&8e0&12e2&callback=_xdc_._1tyowz&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=77357")
			.resources(http("request_5")
			.options(uri4 + "/location/near")
			.headers(headers_5),
            http("request_6")
			.post(uri4 + "/location/near")
			.headers(headers_6)
			.body(RawFileBody("/nearbyfriendsinmapdisplayed/0006_request.json")),
            http("request_7")
			.get(uri1 + "/AuthenticationService.Authenticate?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2Fmap&4sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&callback=_xdc_._6jg7ln&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=25068"),
            http("request_8")
			.get(uri1 + "/QuotaService.RecordEvent?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2Fmap&3sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&7stgybwf&10e1&callback=_xdc_._9ny1qy&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=87877"),
            http("request_9")
			.options(uri4 + "/add")
			.headers(headers_5),
            http("request_10")
			.post(uri4 + "/add")
			.headers(headers_10)
			.body(RawFileBody("/nearbyfriendsinmapdisplayed/0010_request.json")),
            http("request_11")
			.options(uri4 + "/getById")
			.headers(headers_5),
            http("request_12")
			.post(uri4 + "/getById")
			.headers(headers_12)
			.body(RawFileBody("/nearbyfriendsinmapdisplayed/0012_request.json")),
            http("request_13")
			.post(uri4 + "/location/near")
			.headers(headers_6)
			.body(RawFileBody("/nearbyfriendsinmapdisplayed/0013_request.json"))))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}