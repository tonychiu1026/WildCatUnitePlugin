using System;
using System.Reflection;
using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.Idioms;
using FluentAssertions;
using Moq;
using WildCatUnitePlugin;
using Xunit;

namespace WildCatUnitePluginTest
{
    public class WildCatAuthenicationEventArgsTest
    {
        private readonly Type _sutType = typeof(WildCatAuthenicationEventArgs);
        private readonly IFixture _fixture;

        public WildCatAuthenicationEventArgsTest()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        #region Ctor

        [Trait("Category", "Unit")]
        [Fact]
        public void NullArguments_Ctor_ThrowArgumentNullException()
        {
            // Given
            var assertion = new GuardClauseAssertion(_fixture, new NullReferenceBehaviorExpectation());
            // When
            ConstructorInfo[] sutConstructorInfos = _sutType.GetConstructors();
            // Then
            assertion.Verify(sutConstructorInfos);
        }

        [Trait("Category", "Unit")]
        [Fact]
        public void Sut_Type_MustNotHaveDefaultCtor()
        {
            // Given
            // When
            // Then
            _sutType.Should().NotHaveDefaultConstructor();
        }

        [Trait("Category", "Unit")]
        [Fact]
        public void Sut_Type_ImplementsInterface()
        {
            // Given
            // When
            // Then
            _sutType.Should().BeAssignableTo<WildCatAuthenicationEventArgs>();
        }

        #endregion Ctor
    }
}


