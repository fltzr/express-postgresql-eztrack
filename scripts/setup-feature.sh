#!/bin/bash

# Check if feature name is provided
if [ -z "$1" ]; then
    echo "No feature name provided"
    exit 1
fi

FEATURE_NAME=$1
FEATURE_DIR="src/features/$FEATURE_NAME"

# Check if feature already exists
if [ -d "$FEATURE_DIR" ]; then
    echo "Feature already exists"
    exit 1
fi

# Create feature directory
mkdir -p $FEATURE_DIR

# Create feature files
touch "$FEATURE_DIR/$FEATURE_NAME.controller.ts"
touch "$FEATURE_DIR/$FEATURE_NAME.dto.ts"
touch "$FEATURE_DIR/$FEATURE_NAME.entity.ts"
touch "$FEATURE_DIR/$FEATURE_NAME.middleware.ts"
touch "$FEATURE_DIR/$FEATURE_NAME.routes.ts"
touch "$FEATURE_DIR/$FEATURE_NAME.service.ts"
touch "$FEATURE_DIR/$FEATURE_NAME.types.ts"


