{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "ordermgt.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "ordermgt.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{- define "ordermgt_orders.fullname" -}}
{{- printf "%s-%s-orders" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ordermgt_payments.fullname" -}}
{{- printf "%s-%s-payments" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ordermgt_frontend.fullname" -}}
{{- printf "%s-%s-frontend" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ordermgt_orders-deployment.fullname" -}}
{{- printf "%s-%s-backend-dpl" .Release.Name .Chart.Name|       trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ordermgt_orders-service.url" -}}
{{- if .Values.frontend.env.backend -}}
{{- .Values.frontend.env.backend | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "http://%s-%s-backend-svc:8080" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{- define "ordermgt_payments-deployment.fullname" -}}
{{- printf "%s-%s-backend-dpl" .Release.Name .Chart.Name|       trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ordermgt_frontend-deployment.fullname" -}}
{{- printf "%s-%s-frontend-dpl" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ordermgt_orders-service.fullname" -}}
{{- printf "%s-%s-backend-svc" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ordermgt_payments-service.fullname" -}}
{{- printf "%s-%s-backend-svc" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ordermgt_frontend-service.fullname" -}}
{{- printf "%s-%s-frontend-svc" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "ordermgt.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "ordermgt.labels" -}}
helm.sh/chart: {{ include "ordermgt.chart" . }}
{{ include "ordermgt.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "ordermgt.selectorLabels" -}}
app.kubernetes.io/name: {{ include "ordermgt.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "ordermgt.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "ordermgt.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
