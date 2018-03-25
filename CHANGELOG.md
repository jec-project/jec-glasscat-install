# JEC GlassCat Install Project: Update Release Notes

<a name="jec-glasscat-install-1.0.9"></a>
## **1.0.9** (2018-03-25)

### Bug Fixes

### Features

- Adding server metadata functionalities

<a name="jec-glasscat-install-1.0.8"></a>
## **1.0.8** (2017-12-26)

### Bug Fixes

### Features

- Dependencies upgrade
- Fixing `jec-commons` module break changes

<a name="jec-glasscat-install-1.0.7"></a>
## **1.0.7** (2017-11-12)

### Bug Fixes

- Asynchronous bug: fixing callback issues in the `CopyDirsTask` task
- Setting the correct task name when logging the end of the `run()` function whithin the install task runner
- Changing the install task runner implementation, from parallel to sequential, to prevent tasks dependencies errors

### Features

<a name="jec-glasscat-install-1.0.6"></a>
## **1.0.6** (2017-11-12)

### Bug Fixes

- Fixing missing property bug: setting `defaultGpmList` property of the `InstallDefaultGpmTaskProps` instance in the parsing process of the default GPM install task

### Features

<a name="jec-glasscat-install-1.0.5"></a>
## **1.0.5** (2017-11-05)

### Bug Fixes

### Features

- **InstallDefaultGpmTask**: adding the task that downloads and installs the default GlassCat Project Models (GPMs)

<a name="jec-glasscat-install-1.0.4"></a>
## **1.0.4** (2017-09-06)

### Bug Fixes

### Features

- Dependencies upgrade

<a name="jec-glasscat-install-1.0.3"></a>
## **1.0.3** (2017-08-22)

### Bug Fixes

### Features

- **BuildConsoleTask**: adding the task that builds the admin console at the end of the install process

<a name="jec-glasscat-install-1.0.2"></a>
## **1.0.2** (2017-08-20)

### Bug Fixes

- **postinstall**: removing the post install script

### Features

- **dist**: adding binaries to the `dist` folder

<a name="jec-glasscat-install-1.0.1"></a>
## **1.0.1** (2017-08-20)

### Bug Fixes

### Features

- Fixing peer dependencies for GlassCat alpha releases integration

<a name="jec-glasscat-install-1.0.0"></a>
## **1.0.0** (2017-08-16)

### Bug Fixes

### Features

- Initial release of the JEC GlassCat Install module