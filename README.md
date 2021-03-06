# Introduction
This project brings the functionalities:
- Read EXIF from specified Image;
- Update EXIF from specified Image;
- Resize Image;

# Infrastructure
Unlike HIH, ACGallery projects which split the UI project and its Web API project, this project embedded the Angular App within ASP.NET Core project.

## SPA Template
Though Microsoft introduce SPA template for Angular, that template was quite out-of-date.

## Real approach
To make the Angular app embedded into ASP.NET Core project, here comes the list of steps:
- Manually change the csproject file by adding parts:
  <Target Name="DebugEnsureNodeEnv" BeforeTargets="Build" Condition=" '$(Configuration)' == 'Debug' And !Exists('$(UISrcRoot)node_modules') ">
    <!-- Ensure Node.js is installed -->
    <Exec Command="echo Checking Node.js existence..." />
    <Exec Command="node --version" ContinueOnError="true">
      <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
    </Exec>
    <Error Condition="'$(ErrorCode)' != '0'" Text="Node.js is required to build and run this project. To continue, please install Node.js from https://nodejs.org/, and then restart your command prompt or IDE." />
    <Message Importance="high" Text="Restoring dependencies using 'npm'. This may take several minutes..." />
    <Exec WorkingDirectory="$(UISrcRoot)" Command="npm install" />
  </Target>
  
  <Target Name="UIBuildForDebug" BeforeTargets="Build" Condition=" '$(Configuration)' == 'Debug' And Exists('$(UISrcRoot)node_modules') ">
    <Exec Command="echo Building Angular App via 'ng build'..." />
    <Exec WorkingDirectory="$(UISrcRoot)" Command="npm run build" />
  </Target>

  <Target Name="UIBuildForRelease" BeforeTargets="Build" Condition=" '$(Configuration)' == 'Release' And Exists('$(UISrcRoot)node_modules') ">
    <Exec Command="echo Building Angular App via 'ng build --prod'..." />
    <Exec WorkingDirectory="$(UISrcRoot)" Command="npm run build --prod" />
  </Target>

- Change angular.json by setting its dest folder to wwwroot:
"outputPath": "../../wwwroot"

- Enable static files in ASP.NET Core project.

- [Optional] Visual Studio Code can be used to edit it for sure.
Commands for building and starting the project: 
msbuild acimgexif.sln
dotnet run --project ./acimgexif/acimgexif.csproj

## TBD.

