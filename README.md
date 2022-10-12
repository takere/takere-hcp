
<p align='center'>
<img src='https://raw.githubusercontent.com/takere/.github/main/docs/images/logo/logo.png' alt="logo" />
</p>

<h1 align='center'>Takere - HCP</h1>
<p align='center'>Takere for healthcare professionals</p>
<p align="center">
	<a href="https://github.com/takere/takere-hcp/actions/workflows/windows.yml"><img src="https://github.com/takere/takere-hcp/actions/workflows/windows.yml/badge.svg" alt=""></a>
	<a href="https://github.com/takere/takere-hcp/actions/workflows/macos.yml"><img src="https://github.com/takere/takere-hcp/actions/workflows/macos.yml/badge.svg" alt=""></a>
	<a href="https://github.com/takere/takere-hcp/actions/workflows/ubuntu.yml"><img src="https://github.com/takere/takere-hcp/actions/workflows/ubuntu.yml/badge.svg" alt=""></a>
	<a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React-14.0+-D0008F.svg" alt="React"></a>
	<a href="https://github.com/takere/takere-hcp/blob/master/LICENSE"><img src="https://img.shields.io/github/license/takere/takere-hcp" alt="License"></a>
	<a href="https://github.com/takere/takere-hcp/releases"><img src="https://img.shields.io/github/v/release/takere/takere-hcp" alt="Release"></a>
</p>

<hr />

## ❇ Introduction
Takere for healthcare professionals (HCP) is a system that allows the definition of a care plan along with monitoring patients’ progress. It is developed using [React](https://reactjs.org), which is a framework for creating websites using component-oriented programming.

### Care plan flow
We use drag-and-drop concept for building a care plan flow. The system shows care plan elements available for use in the flow. To include an element in the flow, the user needs to drag it and drop it in the flow (Figure 1). After that, it is necessary to connect these elements. Each connection is an arrow, indicating a dependency relation. For example, if an element Y should be generated only after an element X was completed, then the user must connect X with Y (in this order), resulting in the Figure 2.
Each flow must begin with the ’Begin’ element, which indicates when the care plan begins and when it ends (Figure 3). If the end date is unknown, it can be marked as ’undefined end’, indicating the flow should stay active without a time to become disabled. Finally, each flow has a name, a description, and the email of the target patient.

#### Figure 1

![Drag-and-drop example using Begin element](https://raw.githubusercontent.com/takere/takere-hcp/master/docs/images/explanation/begin-drag-drop.png)

#### Figure 2

![Two elements: X and Y, being Y a child of X](https://raw.githubusercontent.com/takere/takere-hcp/master/docs/images/explanation/xy.png)

#### Figure 3

![Begin element - configuration window](https://raw.githubusercontent.com/takere/takere-hcp/master/docs/images/explanation/begin-configuration.png)

### Monitoring patients
After a care plan flow is created, the target patient of the flow can start his/her treatment. When care plan elements are completed by him/her, results about this patient become available. This information can be monitored by HCP, seeing which elements have been completed, which are ongoing and those that are late (Figure 4). It is also possible to see patient input, if the element has inputs (Figure 5).

#### Figure 4

![Care plan progress based on a created flow - HCP view](https://raw.githubusercontent.com/takere/takere-hcp/master/docs/images/explanation/hcp-patients.png)

#### Figure 5

![HCP view about one care plan element that has input fields](https://raw.githubusercontent.com/takere/takere-hcp/master/docs/images/explanation/patient-progress-details.png)


## 👥 Acknowledgements
Special thanks to [Rodolfo Viola](https://github.com/rodolfoviolac) for starting development of the platform.

## ✔ Requirements

```
Coming soon
```

## ℹ How to run

```
Coming soon
```

## 🖼 Gallery

```
Coming soon
```


## 🚩 Changelog
Details about each version are documented in the [releases section](https://github.com/takere/takere-hcp/releases).

## 🗺 Project structure
![architecture](https://raw.githubusercontent.com/takere/takere-hcp/master/docs/images/design/architecture.png)

This front-end system has no information about the semantics of a care plan element and knows only its structure. The business logic is in [Takere - API](https://github.com/takere/takere-api).

## 📁 Files

### /
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|\_\_tests\_\_|`Directory`|Test files|
|docs |`Directory`|Documentation files|
|src     |`Directory`| Source files|

### /src
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|assets|`Directory`|Application static files|
|components|`Directory`|Collection of user interface components (like buttons and inputs) that can be used across various files in the project|
|config|`Directory`|Environment variables and configuration related files|
|models / domain / dto|`Directory`|Data and database model files|
|pages|`Directory`|Files responsible for showing information to users according to some endpoint|
|parts|`Directory`|User interface components used for composing components|
|routes|`Directory`|Files responsible for defining application endpoints and handling them|
|services|`Directory`|Files responsible for business logic|
|App.tsx|`File`|Application point entry|

