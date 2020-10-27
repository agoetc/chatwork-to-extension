enablePlugins(ScalaJSPlugin)

lazy val root = (project in file("."))
  .settings(
    name := "Chatwork To Extension",
    scalaVersion := "2.13.3",
    libraryDependencies += "org.scala-js" %%% "scalajs-dom" % "1.1.0"
  ).settings(scalaJsSetting)



val scalaJsSetting = Seq(
  // This is an application with a main method
  scalaJSUseMainModuleInitializer := true,
  artifactPath in(Compile, fastOptJS) := baseDirectory.value / "output" / "content.js",
  artifactPath in(Compile, fullOptJS) := baseDirectory.value / "output" / "content.js"
)

