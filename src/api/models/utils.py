from typing import Type

from fastapi import Form
from pydantic import BaseModel


def form_body(cls: Type[BaseModel]) -> Type[BaseModel]:
    """Decorator allows BaseModel to be used in Form Data"""
    params = []
    for arg in zip(cls.__signature__.parameters.values(), cls.__fields__.values()):
        if arg[1].required:
            params += [arg[0].replace(default=Form())]
        else:
            params += [arg[0].replace(default=Form(None))]
    cls.__signature__ = cls.__signature__.replace(parameters=params)

    return cls
