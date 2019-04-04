#!/usr/bin/env bash
set -e # ensure that this script will return a non-0 status code if any of rhe commands fail
set -o pipefail # ensure that this script will return a non-0 status code if any of rhe commands fail

cat << EOF > service.yaml
---
apiVersion: v1
kind: Service
metadata:
  name: $GROUP-$SERVICENAME
spec:
  selector:
    app: $GROUP-$SERVICENAME
  ports:
  - name: application
    port: $PORT
---
apiVersion: extensions/v1beta1
kind: Deployment

metadata:
  name: $GROUP-$SERVICENAME
  labels:
    imageTag: '$VERSION'
spec:
  revisionHistoryLimit: 15
  replicas: 1
  strategy:
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: $GROUP-$SERVICENAME
    spec:
      containers:
      - name: $GROUP-$SERVICENAME
        image: gcr.io/$CLOUD/$GROUP/$SERVICENAME:$VERSION
        env:
          - name: NODE_ENV
            value: $NODE_ENV
          - name: PORT
            value: '$PORT'
        ports:
          - containerPort: $PORT
        readinessProbe:
          httpGet:
            path: $HEALTHCHECK
            port: $PORT
          initialDelaySeconds: 15
          timeoutSeconds: 1
          periodSeconds: 5
          failureThreshold: 1
        livenessProbe:
          httpGet:
            path: $HEALTHCHECK
            port: $PORT
          initialDelaySeconds: 15
          periodSeconds: 15
          timeoutSeconds: 30
          failureThreshold: 4
        resources:
          limits:
            memory: 512Mi
          requests:
            memory: 256Mi

EOF
